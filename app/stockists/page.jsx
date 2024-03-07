import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";

// Stockist entry subcomponent
const StockistEntry = ({ country, stockists }) => (
  <div className="p-2">
    <h3 className="font-light tracking-tight text-md uppercase border border-black inline-block px-2">
      {country}
    </h3>
    {stockists.map((stockist, index) => (
      <div key={index} className="mt-6">
        <p className="font-bold">{stockist.city}</p>
        {stockist.places.map((place, idx) => (
          <div key={idx} className="mt-2">
            <p>{place.name}</p>
            <p>{place.address}</p>
            {place.phone && <p>{place.phone}</p>}
            <Link
              href={`https://www.google.com/maps?q=${encodeURIComponent(
                place.address
              )}`}
              target="_blank"
            >
              <p className="border-b border-black inline-block cursor-pointer text-sm mb-4">
                SEE MAPS
              </p>
            </Link>
          </div>
        ))}
      </div>
    ))}
  </div>
);

// Stockists data
const stockistsData = [
  {
    country: "Australia",
    stockists: [
      {
        city: "Perth",
        places: [
          {
            name: "LO FI",
            address: "18 Howard St, WA 6000",
            phone: "+61 8 9486 8059",
          },
        ],
      },
    ],
  },
  {
    country: "Belgium",
    stockists: [
      // Brussels
      {
        city: "Brussels",
        places: [
          {
            name: "SMETS",
            address: "Rue de Namur 68, 1000 Bruxelles",
            phone: "+32 2 325 12 30",
          },
          {
            name: "The HOXTON",
            address: "1 square Victoria Régina, 1210 Bruxelles",
          },
          {
            name: "HomePage",
            address: "Edelknaapstraat 102/109, 1050 Brussels",
            phone: "02 537 00 38",
          },
        ],
      },
      // Antwerp
      {
        city: "Antwerp",
        places: [
          {
            name: "VIIER",
            address: "Theodoor van Rijswijckplaats 4, 2000 Antwerpen",
            phone: "03 233 62 29",
          },
        ],
      },
    ],
  },
  {
    country: "Canada",
    stockists: [
      // North Vancouver
      {
        city: "North Vancouver",
        places: [
          {
            name: "Ahoy",
            address: "4391 Gallant Ave, North Vancouver, BC V7G 1L2",
            phone: "+1 604-770-3110",
          },
        ],
      },
      // Toronto
      {
        city: "Toronto",
        places: [
          {
            name: "Club Paris",
            address: "146 Ossington Ave, Toronto, ON M6J 2Z5",
          },
        ],
      },
    ],
  },
  {
    country: "Luxembourg",
    stockists: [
      {
        city: "Luxembourg",
        places: [
          {
            name: "SMETS",
            address: "262 Rte d'Arlon, 8010 Strassen, Luxembourg",
          },
        ],
      },
    ],
  },
  {
    country: "The Netherlands",
    stockists: [
      {
        city: "Rotterdam",
        places: [
          {
            name: "Dirt NL",
            address: "Lange Haven 106, 3111 CJ Schiedam",
            phone: "+ 31 (0) 6 51 75 27 59",
          },
          {
            name: "Store Store",
            address: "Gouvernestraat 271, 3014 PM Rotterdam",
          },
        ],
      },
    ],
  },
  {
    country: "Republic of Korea",
    stockists: [
      {
        city: "Seoul",
        places: [
          {
            name: "Words Corporation",
            address: "5F, 127, Seongsui-ro, Seongdong-gu, Seoul",
            phone: "+827 0 7424 9393",
          },
        ],
      },
    ],
  },
  {
    country: "Taiwan",
    stockists: [
      {
        city: "Taipei",
        places: [
          {
            name: "Pon Ding",
            address:
              "No. 6號, Lane 53, Section 1, Zhongshan N Rd, Zhongshan District, Taipei City",
            phone: "+886 2 2537 7281",
          },
          {
            name: "Artifacts",
            address:
              "No. 23號, Lane 177, Section 1, Dunhua S Rd, Da’an District, Taipei City",
            phone: "+886 2 2731 0682",
          },
        ],
      },
    ],
  },
  {
    country: "UK",
    stockists: [
      {
        city: "London",
        places: [
          {
            name: "Store Store",
            address: "118, Lower, Stable St, London N1C 4DR",
          },
        ],
      },
    ],
  },
  {
    country: "Switzerland",
    stockists: [
      {
        city: "Zürich",
        places: [
          {
            name: "Kunsthaus",
            address: "Heimpl. ⅕, 8001 Zürich",
          },
        ],
      },
      {
        city: "Basel",
        places: [
          {
            name: "Vitra Campus",
            address: "Charles-Eames-Straße 2, 79576 Weil am Rhein",
          },
        ],
      },
    ],
  },
  {
    country: "USA",
    stockists: [
      {
        city: "NYC",
        places: [
          {
            name: "Strada",
            address: "555 W 25th St, New York",
          },
        ],
      },
      {
        city: "Essex",
        places: [
          {
            name: "Pon the Store",
            address: "164 Main St, Essex, MA 01929",
            phone: "+1 978-309-8864",
          },
        ],
      },
    ],
  },
  {
    country: "France",
    stockists: [
      {
        city: "Marseille",
        places: [
          {
            name: "La Maison Marseillaise",
            address: "38 Rue Francis Davso, 13001 Marseille",
          },
        ],
      },
    ],
  },
];

export default function StockistsPage() {
  return (
    <div className="bg-white font-extralight tracking-tight text-gray-900 h-full p-10">
      <ScrollToTop />

      <div className="mx-auto max-w-7xl p-1 my-32 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 text-sm lg:text-base">
          {stockistsData.map((stockist, index) => (
            <StockistEntry
              key={index}
              country={stockist.country}
              stockists={stockist.stockists}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
