import { Zap, Smartphone, CalendarDays } from "lucide-react";

const Features = () => {
  return (
    <div className="py-16 mt-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        <div>
          <div className="flex justify-center mb-4">
            <Zap className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Proses Cepat
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Pemesanan tiket berlangsung cepat dan otomatis sehingga Anda dapat
            mengamankan tempat tanpa menunggu lama.
          </p>
        </div>

        <div>
          <div className="flex justify-center mb-4">
            <Smartphone className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Akses Mudah
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Akses dengan nyaman dari perangkat apa pun melalui antarmuka yang
            cepat dan responsif.
          </p>
        </div>

        <div>
          <div className="flex justify-center mb-4">
            <CalendarDays className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Event Terkini dalam Satu Platform
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Jelajahi berbagai acara terbaru yang selalu diperbarui, mulai dari
            webinar, konser, hingga workshop.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
