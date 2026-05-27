# ADR 0006: LaunchDarkly for feature flags

Status: Accepted

We need controlled rollouts. Built-in flag systems considered, but ops cost
high.

Decision: LaunchDarkly. Cost is justified by velocity.

Consequences: vendor dependency. Mitigated by a thin wrapper interface.
