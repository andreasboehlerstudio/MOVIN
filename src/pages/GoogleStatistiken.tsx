import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Activity, BarChart3, Clock, Download, Eye, KeyRound, Lock, MonitorSmartphone, MousePointerClick, QrCode, RefreshCw, Search, Users } from 'lucide-react';
import SEO from '../components/seo/SEO';

type AnalyticsSummary = {
  configured: boolean;
  range: string;
  updatedAt: string;
  summary: {
    activeUsers: number;
    sessions: number;
    pageViews: number;
    averageSessionDuration: number;
    engagementRate: number;
  };
  daily: Array<{
    date: string;
    activeUsers: number;
    sessions: number;
    pageViews: number;
  }>;
  pages: Array<{
    path: string;
    title: string;
    pageViews: number;
    activeUsers: number;
    engagementRate: number;
  }>;
  sources: Array<{
    channel: string;
    sessions: number;
  }>;
  devices: Array<{
    device: string;
    sessions: number;
  }>;
  qrRedirects: Array<{
    campaign: string;
    label: string;
    analyticsCampaign: string;
    shortUrl: string;
    target: string;
    accesses: number;
    totalAccesses: number;
    lastAccess: string;
  }>;
  qrCampaigns: Array<{
    campaign: string;
    medium: string;
    content: string;
    sessions: number;
    activeUsers: number;
    pageViews: number;
    engagementRate: number;
  }>;
};

type SetupState = {
  configured: false;
  message: string;
  requiredEnv: string[];
};

const rangeOptions = [
  { value: '7d', label: '7 Tage' },
  { value: '30d', label: '30 Tage' },
  { value: '90d', label: '90 Tage' },
];

const numberFormatter = new Intl.NumberFormat('de-DE');

function formatNumber(value: number) {
  return numberFormatter.format(Math.round(value || 0));
}

function formatPercent(value: number) {
  return `${Math.round((value || 0) * 100)} %`;
}

function formatDuration(seconds: number) {
  const safeSeconds = Math.max(0, Math.round(seconds || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const restSeconds = safeSeconds % 60;
  return `${minutes}:${String(restSeconds).padStart(2, '0')} Min.`;
}

function formatDate(value: string) {
  if (!/^\d{8}$/.test(value)) return value;
  return `${value.slice(6, 8)}.${value.slice(4, 6)}.`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-dark/45">{label}</p>
      <p className="mb-2 text-3xl font-black text-secondary">{value}</p>
      <p className="text-sm text-dark/60">{detail}</p>
    </div>
  );
}

export default function GoogleStatistiken() {
  const [range, setRange] = useState('30d');
  const [accessCode, setAccessCode] = useState('');
  const [dashboardToken, setDashboardToken] = useState('');
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [setup, setSetup] = useState<SetupState | null>(null);
  const [requiresToken, setRequiresToken] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = window.sessionStorage.getItem('movinAnalyticsDashboardToken') || '';
    setAccessCode(savedToken);
    setDashboardToken(savedToken);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/analytics-summary.php?range=${range}`, {
          signal: controller.signal,
          headers: dashboardToken
            ? { 'X-Analytics-Dashboard-Token': dashboardToken }
            : undefined,
        });
        const payload = await response.json();

        if (response.status === 503) {
          setSetup(payload);
          setData(null);
          setRequiresToken(false);
          return;
        }

        if (response.status === 401) {
          setRequiresToken(true);
          setData(null);
          setSetup(null);
          setError(payload.message || 'Bitte Zugriffscode eingeben.');
          return;
        }

        if (!response.ok) {
          throw new Error(payload.message || 'Die Analytics-Daten konnten nicht geladen werden.');
        }

        setData(payload);
        setSetup(null);
        setRequiresToken(false);
      } catch (loadError: any) {
        if (loadError.name !== 'AbortError') {
          setData(null);
          setError(loadError.message || 'Die Analytics-Daten konnten nicht geladen werden.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadStats();
    return () => controller.abort();
  }, [range, dashboardToken]);

  const maxDailyViews = useMemo(() => {
    return Math.max(1, ...(data?.daily || []).map((item) => item.pageViews));
  }, [data]);

  const totalSourceSessions = useMemo(() => {
    return Math.max(1, ...(data?.sources || []).map((source) => source.sessions));
  }, [data]);

  const qrLinkAccesses = useMemo(() => {
    return (data?.qrRedirects || []).reduce((sum, item) => sum + item.accesses, 0);
  }, [data]);

  const qrAnalyticsSessions = useMemo(() => {
    return (data?.qrCampaigns || []).reduce((sum, item) => sum + item.sessions, 0);
  }, [data]);

  const handleTokenSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedCode = accessCode.trim();
    window.sessionStorage.setItem('movinAnalyticsDashboardToken', trimmedCode);
    setDashboardToken(trimmedCode);
  };

  return (
    <>
      <SEO
        title="Google Statistiken"
        description="Interne Uebersicht der Google Analytics Kennzahlen fuer die MOVIN Website."
        noindex
      />

      <section className="bg-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 overflow-hidden rounded-[2rem] bg-secondary text-white shadow-xl">
            <div className="relative p-8 md:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(103,198,207,0.36),transparent_32%),linear-gradient(135deg,rgba(16,24,83,0.95),rgba(19,114,128,0.86))]" />
              <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-tint">
                    <Lock className="h-4 w-4" />
                    Interne Auswertung
                  </div>
                  <h1 className="mb-4 text-4xl font-black md:text-6xl">Google Statistiken</h1>
                  <p className="max-w-3xl text-lg leading-relaxed text-white/78 md:text-xl">
                    Uebersicht der wichtigsten GA4-Kennzahlen fuer die MOVIN Website. Die Daten werden serverseitig aus Google Analytics geladen, sobald der Zugriff eingerichtet ist.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 rounded-full bg-white/10 p-2">
                  {rangeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRange(option.value)}
                      className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                        range === option.value
                          ? 'bg-white text-secondary'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {setup && (
            <div className="mb-10 rounded-[2rem] border border-amber-200 bg-amber-50 p-8 text-amber-950">
              <div className="mb-4 flex items-center gap-3">
                <KeyRound className="h-6 w-6" />
                <h2 className="m-0 text-2xl font-black">Google Analytics ist noch nicht verbunden</h2>
              </div>
              <p className="mb-5 text-amber-900/80">{setup.message}</p>
              <p className="mb-3 font-bold">Diese Server-Variablen fehlen noch:</p>
              <div className="flex flex-wrap gap-2">
                {setup.requiredEnv.map((envName) => (
                  <span key={envName} className="rounded-full bg-white px-4 py-2 font-mono text-sm shadow-sm">
                    {envName}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-amber-900/70">
                Der Google Service Account muss in der GA4 Property mindestens Leserechte erhalten.
              </p>
            </div>
          )}

          {requiresToken && !setup && (
            <form onSubmit={handleTokenSubmit} className="mb-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <KeyRound className="h-6 w-6 text-primary" />
                <h2 className="m-0 text-2xl font-black text-secondary">Zugriffscode eingeben</h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="password"
                  value={accessCode}
                  onChange={(event) => setAccessCode(event.target.value)}
                  className="min-h-14 flex-1 rounded-full border border-slate-200 px-5 font-semibold text-secondary outline-none transition-colors focus:border-primary"
                  placeholder="Interner Zugriffscode"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="min-h-14 rounded-full bg-primary px-8 font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
                >
                  Anzeigen
                </button>
              </div>
              {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
            </form>
          )}

          {isLoading && !setup && (
            <div className="flex min-h-64 items-center justify-center rounded-[2rem] border border-slate-200 bg-white">
              <div className="flex items-center gap-3 text-secondary">
                <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                <span className="font-bold">Google Statistiken werden geladen ...</span>
              </div>
            </div>
          )}

          {data && !isLoading && (
            <div className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <StatCard icon={Users} label="Aktive Nutzer" value={formatNumber(data.summary.activeUsers)} detail={data.range} />
                <StatCard icon={MousePointerClick} label="Sitzungen" value={formatNumber(data.summary.sessions)} detail="Besuche der Website" />
                <StatCard icon={Eye} label="Seitenaufrufe" value={formatNumber(data.summary.pageViews)} detail="Alle gemessenen Aufrufe" />
                <StatCard icon={Clock} label="Ø Sitzungsdauer" value={formatDuration(data.summary.averageSessionDuration)} detail="Durchschnittliche Dauer" />
                <StatCard icon={Activity} label="Engagement" value={formatPercent(data.summary.engagementRate)} detail="GA4 Engagement Rate" />
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-white shadow-sm">
                <div className="grid gap-6 bg-secondary p-6 text-white md:grid-cols-[1fr_auto_auto] md:items-center md:p-8">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <QrCode className="h-7 w-7 text-primary-light" />
                      <h2 className="m-0 text-2xl font-black text-white">QR-Kampagnen</h2>
                    </div>
                    <p className="m-0 max-w-2xl text-sm leading-relaxed text-white/65">
                      Anonyme Link-Aufrufe vom IONOS-Server und einwilligungsbasierte Website-Sitzungen aus GA4.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-6 py-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-white/55">Link-Aufrufe</p>
                    <p className="m-0 text-3xl font-black text-primary-light">{formatNumber(qrLinkAccesses)}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-6 py-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-white/55">GA4-Sitzungen</p>
                    <p className="m-0 text-3xl font-black text-primary-light">{formatNumber(qrAnalyticsSessions)}</p>
                  </div>
                </div>

                <div className="overflow-x-auto p-6 md:p-8">
                  <table className="w-full min-w-[920px] text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs uppercase tracking-[0.12em] text-dark/45">
                        <th className="pb-4 pr-5">Kampagne</th>
                        <th className="pb-4 pr-5">QR-Adresse</th>
                        <th className="pb-4 pr-5">Aufrufe</th>
                        <th className="pb-4 pr-5">GA4</th>
                        <th className="pb-4">Druckdatei</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.qrRedirects.map((redirect) => {
                        const analytics = data.qrCampaigns.find(
                          (campaign) => campaign.campaign === redirect.analyticsCampaign,
                        );

                        return (
                          <tr key={redirect.campaign} className="border-b border-slate-100 last:border-0">
                            <td className="py-5 pr-5">
                              <p className="mb-1 font-black text-secondary">{redirect.label}</p>
                              <p className="m-0 text-xs text-dark/45">
                                Letzter Aufruf: {redirect.lastAccess
                                  ? new Date(redirect.lastAccess).toLocaleString('de-DE')
                                  : 'noch keiner'}
                              </p>
                            </td>
                            <td className="py-5 pr-5">
                              <code className="rounded-lg bg-light px-3 py-2 text-sm font-bold text-secondary">
                                movin-freiburg.de{redirect.shortUrl}
                              </code>
                              <p className="mb-0 mt-2 text-xs text-dark/45">Ziel: {redirect.target}</p>
                            </td>
                            <td className="py-5 pr-5">
                              <p className="mb-1 text-xl font-black text-primary">{formatNumber(redirect.accesses)}</p>
                              <p className="m-0 text-xs text-dark/45">gesamt {formatNumber(redirect.totalAccesses)}</p>
                            </td>
                            <td className="py-5 pr-5">
                              <p className="mb-1 text-xl font-black text-secondary">{formatNumber(analytics?.sessions || 0)}</p>
                              <p className="m-0 text-xs text-dark/45">
                                {formatNumber(analytics?.activeUsers || 0)} Nutzer · {formatPercent(analytics?.engagementRate || 0)} Engagement
                              </p>
                            </td>
                            <td className="py-5">
                              <a
                                href={`/downloads/qr/${redirect.campaign}-qr.svg`}
                                download
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
                              >
                                <Download className="h-4 w-4" />
                                SVG
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <p className="mb-0 mt-5 text-xs leading-relaxed text-dark/45">
                    Link-Aufrufe können Wiederholungen oder technische Vorschauen enthalten. GA4 zählt nur Sitzungen nach erteilter Analytics-Einwilligung.
                  </p>
                </div>
              </div>

              <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="mb-1 text-2xl font-black text-secondary">Verlauf</h2>
                      <p className="text-sm text-dark/55">Seitenaufrufe pro Tag</p>
                    </div>
                    <BarChart3 className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex h-72 items-end gap-2 overflow-x-auto pb-3">
                    {data.daily.map((item) => (
                      <div key={item.date} className="flex min-w-10 flex-1 flex-col items-center justify-end gap-2">
                        <div
                          className="w-full rounded-t-2xl bg-gradient-to-t from-primary to-mint"
                          style={{ height: `${Math.max(8, (item.pageViews / maxDailyViews) * 220)}px` }}
                          title={`${formatDate(item.date)}: ${formatNumber(item.pageViews)} Seitenaufrufe`}
                        />
                        <span className="text-xs font-semibold text-dark/45">{formatDate(item.date)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="mb-1 text-2xl font-black text-secondary">Quellen</h2>
                      <p className="text-sm text-dark/55">Sitzungen nach Kanal</p>
                    </div>
                    <Search className="h-7 w-7 text-primary" />
                  </div>
                  <div className="space-y-4">
                    {data.sources.map((source) => (
                      <div key={source.channel}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-secondary">
                          <span>{source.channel}</span>
                          <span>{formatNumber(source.sessions)}</span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100">
                          <div
                            className="h-3 rounded-full bg-primary"
                            style={{ width: `${Math.max(4, (source.sessions / totalSourceSessions) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-2xl font-black text-secondary">Top-Seiten</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-sm uppercase tracking-[0.12em] text-dark/45">
                          <th className="pb-4 pr-4">Seite</th>
                          <th className="pb-4 pr-4">Aufrufe</th>
                          <th className="pb-4 pr-4">Nutzer</th>
                          <th className="pb-4">Engagement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.pages.map((page) => (
                          <tr key={`${page.path}-${page.title}`} className="border-b border-slate-100 last:border-0">
                            <td className="py-4 pr-4">
                              <p className="mb-1 font-bold text-secondary">{page.title || page.path}</p>
                              <p className="text-sm text-dark/50">{page.path}</p>
                            </td>
                            <td className="py-4 pr-4 font-bold text-secondary">{formatNumber(page.pageViews)}</td>
                            <td className="py-4 pr-4 font-bold text-secondary">{formatNumber(page.activeUsers)}</td>
                            <td className="py-4 font-bold text-secondary">{formatPercent(page.engagementRate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 className="m-0 text-2xl font-black text-secondary">Geraete</h2>
                    <MonitorSmartphone className="h-7 w-7 text-primary" />
                  </div>
                  <div className="space-y-4">
                    {data.devices.map((device) => (
                      <div key={device.device} className="flex items-center justify-between rounded-2xl bg-light px-5 py-4">
                        <span className="font-bold capitalize text-secondary">{device.device}</span>
                        <span className="font-black text-primary">{formatNumber(device.sessions)}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-dark/45">
                    Aktualisiert: {new Date(data.updatedAt).toLocaleString('de-DE')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
