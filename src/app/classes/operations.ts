export class OperationsHelper {
  static normalizeText(str: string): string {
    str = str.replace(/[áàãâä]/g, 'a');
    str = str.replace(/[ÁÀÃÂÄ]/g, 'a');
    str = str.replace(/[éèêë]/g, 'e');
    str = str.replace(/[ÉÈÊË]/g, 'e');
    str = str.replace(/[íìîï]/g, 'i');
    str = str.replace(/[ÍÌÎÏ]/g, 'i');
    str = str.replace(/[óòõôö]/g, 'o');
    str = str.replace(/[ÓÒÕÔÖ]/g, 'o');
    str = str.replace(/[úùûü]/g, 'u');
    str = str.replace(/[ÚÙÛÜ]/g, 'u');
    str = str.replace(/[ç]/g, 'c');
    str = str.replace(/[Ç]/g, 'c');
    return str.toLowerCase();
  }

  static searchByPropNames<T>(query: string, items: T[], queryPropNames: string[]): T[] {
    if (!queryPropNames.length) {
      return [];
    }

    return items.filter((item: any) => {
      const targetValues = queryPropNames.map((s) => this.normalizeText(item[s]));
      const filtered = targetValues.filter((str) => str.includes(this.normalizeText(query)))
      return filtered.length;
    });
  }
}
