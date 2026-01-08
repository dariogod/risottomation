import Image from "next/image";

export default function QRCodePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#faf0d8] py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-sm">
            <Image
              src="/qr_code.png"
              alt="QR Code"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
