# Architecture Overview

```
[input] → tokenize → parse → evaluate → [result]
              ↑          ↑         ↑
         lexical    AST cache   result cache
         validation  (ADR-009)  (ADR-009)
```

fast-path 는 evaluate 단계 (ADR-008).
