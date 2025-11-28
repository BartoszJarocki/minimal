import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { H1 } from "../H1";
import { P } from "../P";

export function LicenseForm() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/portal/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.reload();
      } else {
        setError(data.error || "Validation failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md space-y-6">
      <H1>Customer Portal</H1>
      <P>Enter your license key to access downloads.</P>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          className="font-mono"
          disabled={loading}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          variant="cta"
          size="cta"
          disabled={loading || !key.trim()}
          className="w-full"
        >
          {loading ? "Validating..." : "Access Portal"}
        </Button>
      </form>

      <P className="text-sm text-muted-foreground">
        Lost your license key? Check your email receipt or contact support.
      </P>
    </section>
  );
}
