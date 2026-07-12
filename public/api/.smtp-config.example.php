<?php

// GitHub Actions creates .smtp-config.php during deployment. Never commit real credentials.
return [
    'host' => 'smtp.ionos.de',
    'port' => 587,
    'encryption' => 'tls',
    'username' => '',
    'password' => '',
    'from_email' => 'noreply@movin-freiburg.de',
    'from_name' => 'MOVIN Website',
    'contact_receiver' => 'kontakt@movin-freiburg.de',
    'career_receiver' => 'daniel.klein@movin-freiburg.de',
    'anamnese_receiver' => 'anamnesebogen@movin-freiburg.de',
];
