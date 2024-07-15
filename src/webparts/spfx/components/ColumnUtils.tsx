import { IWeb } from "@pnp/sp/webs";

export async function getQAData(spWeb: IWeb): Promise<any> {
  try {
    const items: any[] = await spWeb.lists.getByTitle("QA").items();

    const sections = items.reduce((acc, item) => {
      const section = item.Title;
      const question = item.field_1;
      const hint = item.field_2;
      const rate = item.field_11;
      const id = item.ID;
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push({
        Pytanie: question,
        Podpowiedź: hint,
        id,
        Waga: rate,
      });
      return acc;
    }, {} as Record<string, { Pytanie: string; Podpowiedź: string; id: string; Waga: number }[]>);

    return sections;
  } catch (error) {
    console.error("Error fetching QA data:", error);
    return {};
  }
}
