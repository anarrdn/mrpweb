import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const QRModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-12 rounded-2xl px-3">
          <Image src="/svg/qr.svg" alt="QR Code" width={24} height={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit flex flex-col gap-2 items-center justify-center">
        <Image src="/images/qr.png" alt="QR Code" width={200} height={200} />

        <DialogHeader>
          <DialogTitle>Scan to Download App IOS & Android</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QRModal;
