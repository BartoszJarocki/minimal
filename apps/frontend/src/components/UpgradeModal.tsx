import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LIFETIME_PRODUCT, startCheckout } from "../lib/lifetimeProduct";
import Link from "next/link";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
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
          <Button variant="cta" size="cta" onClick={() => startCheckout("upgrade_modal")}>
            <span>Get lifetime access — {LIFETIME_PRODUCT.displayPrice}</span>
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
