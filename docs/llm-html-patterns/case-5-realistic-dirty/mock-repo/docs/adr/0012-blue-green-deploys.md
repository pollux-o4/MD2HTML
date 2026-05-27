# ADR 0012: Blue/green deploys for the API tier

Status: Accepted

Rolling deploys caused occasional connection blips. Move to blue/green.

Decision: blue/green at the ALB layer. Old fleet drained for 5 minutes.

Consequences: 2x compute during deploy window. Cost acceptable.
