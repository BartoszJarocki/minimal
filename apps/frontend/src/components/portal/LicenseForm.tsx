import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { H1 } from "../H1";
import { P } from "../P";
import { useValidateLicense } from "../../hooks/use-portal";

export function LicenseForm() {
  const [key, setKey] = useState("");
  const validateLicense = useValidateLicense();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateLicense.mutate(key, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  const error = validateLicense.error?.message;

  return (
    <section className="max-w-md space-y-6">
      <H1>Customer Portal</H1>
      <P>Enter your license key to access your account.</P>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          className="font-mono"
          disabled={validateLicense.isPending}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          variant="cta"
          size="cta"
          disabled={validateLicense.isPending || !key.trim()}
          className="w-full"
        >
          {validateLicense.isPending ? "Validating..." : "Access Portal"}
        </Button>
      </form>

      <P className="text-sm text-muted-foreground">
        Lost your license key? Check your email receipt or contact support.
      </P>
    </section>
  );
}
