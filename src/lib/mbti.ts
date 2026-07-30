export function calculateMBTI(traits: string[]): string {
  const counts: Record<string, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  traits.forEach((trait) => {
    if (counts[trait] !== undefined) {
      counts[trait]++;
    }
  });

  const ei = counts.E >= counts.I ? "E" : "I";
  const sn = counts.N >= counts.S ? "N" : "S";
  const tf = counts.T >= counts.F ? "T" : "F";
  const jp = counts.P >= counts.J ? "P" : "J";

  return `${ei}${sn}${tf}${jp}`;
}
