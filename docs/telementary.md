---
id: telementary
title: Telementary
---

Buckaroo contains telemetry so that we know how many users we have for each platform. We generate a random UUID on first launch, and no personal information is sent. Please refer to the source-code or open an issue if you are unsure.

To completely disable this, just set the `BUCKAROO_TELEMETRY_OPT_OUT` environment variable to any value:
```
export BUCKAROO_TELEMETRY_OPT_OUT=1
```