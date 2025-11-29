import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LIFETIME_PRICE, POLAR_PRODUCT_ID } from "../lib/config";
import Link from "next/link";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  const handleCheckout = () => {
    window.location.href = `/api/checkout?products=${POLAR_PRODUCT_ID}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unlock printing</DialogTitle>
          <DialogDescription>
            Get lifetime access to print unlimited habit trackers, calendars,
            and more.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button variant="cta" size="cta" onClick={handleCheckout}>
            <span>Get lifetime access — {LIFETIME_PRICE}</span>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already purchased?{" "}
            <Link href="/portal" className="underline hover:text-foreground">
              Sign in
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
