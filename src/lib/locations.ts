export type ServiceArea = {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  county: string;
  sampleZip: string;
  neighborhoods: string[];
  climateNote: string;
  commonPests: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "phoenix",
    name: "Phoenix",
    state: "Arizona",
    stateCode: "AZ",
    county: "Maricopa County",
    sampleZip: "85016",
    neighborhoods: ["Arcadia", "Biltmore", "Ahwatukee", "Desert Ridge"],
    climateNote:
      "Long hot seasons and irrigated landscaping keep scorpions, roof rats, and subterranean termites active most of the year.",
    commonPests: ["Scorpions", "Roof rats", "Termites", "German cockroaches"],
  },
  {
    slug: "scottsdale",
    name: "Scottsdale",
    state: "Arizona",
    stateCode: "AZ",
    county: "Maricopa County",
    sampleZip: "85251",
    neighborhoods: ["Old Town", "Gainey Ranch", "DC Ranch", "McCormick Ranch"],
    climateNote:
      "Golf-course irrigation and desert lots create steady pressure from mosquitoes, ants, and occasional pack rats.",
    commonPests: ["Mosquitoes", "Ants", "Pack rats", "Scorpions"],
  },
  {
    slug: "mesa",
    name: "Mesa",
    state: "Arizona",
    stateCode: "AZ",
    county: "Maricopa County",
    sampleZip: "85201",
    neighborhoods: ["Dobson Ranch", "Red Mountain", "Eastmark", "Las Sendas"],
    climateNote:
      "Older block construction and citrus trees are common entry points for roof rats and termite swarms.",
    commonPests: ["Roof rats", "Termites", "Crickets", "Ants"],
  },
  {
    slug: "tucson",
    name: "Tucson",
    state: "Arizona",
    stateCode: "AZ",
    county: "Pima County",
    sampleZip: "85701",
    neighborhoods: ["Sam Hughes", "Catalina Foothills", "Oro Valley", "Rita Ranch"],
    climateNote:
      "Monsoon moisture drives scorpions indoors, while foothill properties see pack rats and Africanized bees.",
    commonPests: ["Bark scorpions", "Pack rats", "Africanized bees", "Termites"],
  },
  {
    slug: "chandler",
    name: "Chandler",
    state: "Arizona",
    stateCode: "AZ",
    county: "Maricopa County",
    sampleZip: "85224",
    neighborhoods: ["Ocotillo", "Downtown Chandler", "Andersen Springs"],
    climateNote:
      "Newer master-planned communities still need scheduled exterior barriers for ants and mosquito harborage.",
    commonPests: ["Ants", "Mosquitoes", "Crickets", "Spiders"],
  },
  {
    slug: "las-vegas",
    name: "Las Vegas",
    state: "Nevada",
    stateCode: "NV",
    county: "Clark County",
    sampleZip: "89101",
    neighborhoods: ["Summerlin", "Henderson border", "Downtown", "Green Valley"],
    climateNote:
      "Hotel, restaurant, and HOA properties need documented commercial programs plus fast German roach response.",
    commonPests: ["German cockroaches", "Scorpions", "Roof rats", "Ants"],
  },
];

export function getServiceArea(slug: string) {
  return serviceAreas.find((area) => area.slug === slug);
}
