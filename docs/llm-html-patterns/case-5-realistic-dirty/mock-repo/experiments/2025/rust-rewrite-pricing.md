# Rust rewrite of the pricing engine (spike)

Got 3x perf on a microbenchmark but real-world gain unclear. Team decided
to do lazy eval (ADR 0011) instead — cheaper.
