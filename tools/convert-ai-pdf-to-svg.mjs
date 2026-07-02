import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const [, , input, output] = process.argv;

if (!input || !output) {
  console.error('Usage: node tools/convert-ai-pdf-to-svg.mjs <input.ai> <output.svg>');
  process.exit(1);
}

if (!existsSync(input)) {
  console.error(`Input file not found: ${input}`);
  process.exit(1);
}

const python = 'C:\\Users\\andy_\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe';
const script = String.raw`
from pypdf import PdfReader
from pypdf.generic import ContentStream
import html
import sys

src, dest = sys.argv[1], sys.argv[2]
reader = PdfReader(src)
page = reader.pages[0]
box = page.mediabox
width = float(box.width)
height = float(box.height)
cs = ContentStream(page.get_contents(), reader)

def num(value):
    return float(value)

def fmt(value):
    value = float(value)
    if abs(value) < 0.00001:
        value = 0
    text = f"{value:.4f}".rstrip("0").rstrip(".")
    return text if text else "0"

def mat_mul(a, b):
    return (
        a[0] * b[0] + a[2] * b[1],
        a[1] * b[0] + a[3] * b[1],
        a[0] * b[2] + a[2] * b[3],
        a[1] * b[2] + a[3] * b[3],
        a[0] * b[4] + a[2] * b[5] + a[4],
        a[1] * b[4] + a[3] * b[5] + a[5],
    )

def transform_point(matrix, x, y):
    return (
        matrix[0] * x + matrix[2] * y + matrix[4],
        matrix[1] * x + matrix[3] * y + matrix[5],
    )

def color_to_hex(rgb):
    r, g, b = [max(0, min(255, round(c * 255))) for c in rgb]
    return f"#{r:02x}{g:02x}{b:02x}"

def cmyk_to_rgb(c, m, y, k):
    return (1 - min(1, c + k), 1 - min(1, m + k), 1 - min(1, y + k))

def current_fill_hex(state):
    return color_to_hex(state["fill"])

state = {
    "ctm": (1, 0, 0, 1, 0, 0),
    "fill": (1, 1, 1),
    "stroke": (1, 1, 1),
}
stack = []
path = []
elements = []
clip_id = 0
pending_clip_path = None
active_clip = None
current_color_space = None

def flush_path(fill=False, evenodd=False, stroke=False):
    global path
    if not path:
        return
    d = " ".join(path)
    attrs = [
        f'd="{html.escape(d)}"',
    ]
    if fill:
        attrs.append(f'fill="{current_fill_hex(state)}"')
        if evenodd:
            attrs.append('fill-rule="evenodd"')
    else:
        attrs.append('fill="none"')
    if stroke:
        attrs.append(f'stroke="{color_to_hex(state["stroke"])}"')
    if active_clip:
        attrs.append(f'clip-path="url(#{active_clip})"')
    elements.append("<path " + " ".join(attrs) + "/>")
    path = []

def add_rect(x, y, w, h):
    global path
    p1 = transform_point(state["ctm"], x, y)
    p2 = transform_point(state["ctm"], x + w, y)
    p3 = transform_point(state["ctm"], x + w, y + h)
    p4 = transform_point(state["ctm"], x, y + h)
    path.extend([
        f"M {fmt(p1[0])} {fmt(height - p1[1])}",
        f"L {fmt(p2[0])} {fmt(height - p2[1])}",
        f"L {fmt(p3[0])} {fmt(height - p3[1])}",
        f"L {fmt(p4[0])} {fmt(height - p4[1])}",
        "Z",
    ])

defs = []
for operands, op in cs.operations:
    op = op.decode() if isinstance(op, bytes) else str(op)

    if op == "q":
        stack.append((state.copy(), active_clip))
    elif op == "Q":
        if stack:
            state, active_clip = stack.pop()
    elif op == "cm":
        m = tuple(num(v) for v in operands[:6])
        state["ctm"] = mat_mul(state["ctm"], m)
    elif op in ("cs", "CS"):
        current_color_space = str(operands[0]) if operands else None
    elif op == "scn":
        vals = [num(v) for v in operands]
        if len(vals) >= 4:
            state["fill"] = cmyk_to_rgb(vals[0], vals[1], vals[2], vals[3])
        elif len(vals) >= 3:
            state["fill"] = tuple(vals[:3])
        elif len(vals) == 1:
            state["fill"] = (vals[0], vals[0], vals[0])
    elif op == "rg":
        state["fill"] = tuple(num(v) for v in operands[:3])
    elif op == "RG":
        state["stroke"] = tuple(num(v) for v in operands[:3])
    elif op == "k":
        vals = [num(v) for v in operands[:4]]
        state["fill"] = cmyk_to_rgb(*vals)
    elif op == "K":
        vals = [num(v) for v in operands[:4]]
        state["stroke"] = cmyk_to_rgb(*vals)
    elif op == "g":
        v = num(operands[0])
        state["fill"] = (v, v, v)
    elif op == "G":
        v = num(operands[0])
        state["stroke"] = (v, v, v)
    elif op == "m":
        x, y = transform_point(state["ctm"], num(operands[0]), num(operands[1]))
        path.append(f"M {fmt(x)} {fmt(height - y)}")
    elif op == "l":
        x, y = transform_point(state["ctm"], num(operands[0]), num(operands[1]))
        path.append(f"L {fmt(x)} {fmt(height - y)}")
    elif op == "c":
        p = [transform_point(state["ctm"], num(operands[i]), num(operands[i + 1])) for i in range(0, 6, 2)]
        path.append(
            f"C {fmt(p[0][0])} {fmt(height - p[0][1])} "
            f"{fmt(p[1][0])} {fmt(height - p[1][1])} "
            f"{fmt(p[2][0])} {fmt(height - p[2][1])}"
        )
    elif op == "v":
        # First control point is current point; approximate by repeating the previous endpoint when unsupported.
        p = [transform_point(state["ctm"], num(operands[i]), num(operands[i + 1])) for i in range(0, 4, 2)]
        path.append(
            f"S {fmt(p[0][0])} {fmt(height - p[0][1])} "
            f"{fmt(p[1][0])} {fmt(height - p[1][1])}"
        )
    elif op == "y":
        p = [transform_point(state["ctm"], num(operands[i]), num(operands[i + 1])) for i in range(0, 4, 2)]
        path.append(
            f"C {fmt(p[0][0])} {fmt(height - p[0][1])} "
            f"{fmt(p[1][0])} {fmt(height - p[1][1])} "
            f"{fmt(p[1][0])} {fmt(height - p[1][1])}"
        )
    elif op == "h":
        path.append("Z")
    elif op == "re":
        add_rect(*(num(v) for v in operands[:4]))
    elif op in ("W", "W*"):
        if path:
            clip_id += 1
            rule = ' clip-rule="evenodd"' if op == "W*" else ""
            defs.append(f'<clipPath id="clip-{clip_id}"><path d="{html.escape(" ".join(path))}"{rule}/></clipPath>')
            active_clip = f"clip-{clip_id}"
    elif op == "n":
        path = []
    elif op in ("f", "F"):
        flush_path(fill=True, evenodd=False)
    elif op == "f*":
        flush_path(fill=True, evenodd=True)
    elif op == "S":
        flush_path(fill=False, stroke=True)
    elif op in ("B", "B*"):
        flush_path(fill=True, evenodd=(op == "B*"), stroke=True)
    elif op in ("b", "b*"):
        path.append("Z")
        flush_path(fill=True, evenodd=(op == "b*"), stroke=True)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(width)} {fmt(height)}" role="img" aria-labelledby="title">
  <title id="title">MOVIN Logo</title>
  <defs>
    {chr(10).join(defs)}
  </defs>
  {chr(10).join(elements)}
</svg>
'''
with open(dest, "w", encoding="utf-8", newline="\n") as f:
    f.write(svg)
print(f"wrote {dest}")
print(f"paths {len(elements)} clips {len(defs)} size {width}x{height}")
`;

mkdirSync(dirname(output), { recursive: true });
const result = spawnSync(python, ['-c', script, input, output], {
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
