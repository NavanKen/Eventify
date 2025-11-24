import { Zap, Smartphone, CalendarDays, LayoutGrid } from "lucide-react";

const Features = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Kenapa Memilih Kami?
          </h2>
          <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan pengalaman pemesanan tiket yang cepat, mudah, dan
            aman.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="text-indigo-600 bg-indigo-100 rounded-full p-3">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold">Proses Cepat</h3>
            <p className="text-sm text-gray-600">
              Pemesanan berlangsung otomatis sehingga tiket dapat diamankan
              tanpa menunggu lama.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="text-indigo-600 bg-indigo-100 rounded-full p-3">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold">Akses Mudah</h3>
            <p className="text-sm text-gray-600">
              Bisa diakses dari perangkat apa pun melalui tampilan modern dan
              responsif.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="text-indigo-600 bg-indigo-100 rounded-full p-3">
              <CalendarDays className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold">Event Terbaru</h3>
            <p className="text-sm text-gray-600">
              Dari konser, webinar, hingga workshop — semuanya selalu
              diperbarui.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white border border-gray-200 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="text-indigo-600 bg-indigo-100 rounded-full p-3">
              <LayoutGrid className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold">Kategori Beragam</h3>
            <p className="text-sm text-gray-600">
              Temukan berbagai jenis acara sesuai minatmu dalam satu platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
