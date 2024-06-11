import { IWeb } from "@pnp/sp/webs";
import { IFieldAddResult } from "@pnp/sp/fields";
// import { IQAItem } from "./types"; // Importuj typ IQAItem

export async function getQAData(spWeb: IWeb): Promise<any> {
  try {
    const items: any[] = await spWeb.lists.getByTitle("QA").items();
    console.log("Raw items from QA list:", items); // Dodaj ten wiersz

    items.forEach((item, index) => {
      console.log(`Item ${index}:`, item);
      console.log(
        `Title: ${item.Title}, field_1: ${item.field_1}, field_2: ${item.field_2}, rate: ${item.field_11}`
      );
    });

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

    console.log("Sections:", sections); // Dodaj ten wiersz

    return sections;
  } catch (error) {
    console.error("Error fetching QA data:", error);
    return {};
  }
}

export async function getColumnList(spWeb: IWeb): Promise<string[]> {
  try {
    const fields = await spWeb.lists.getByTitle("Dane").fields();
    return fields.map((field) => field.InternalName);
  } catch (error) {
    console.error("Error fetching column list:", error);
    return [];
  }
}

export async function addMultiLineTextColumnToSharePoint(
  spWeb: IWeb,
  columnName: string,
  existingColumns: string[]
): Promise<void> {
  if (existingColumns.includes(columnName)) {
    alert(`Kolumna "${columnName}" już istnieje!`);
    return;
  }

  try {
    const list = spWeb.lists.getByTitle("Dane");

    const textColumn = {
      description: "This is a multi-line text column",
      enforceUniqueValues: false,
      hidden: false,
      indexed: false,
      name: columnName,
      displayName: columnName,
      text: {
        allowMultipleLines: true,
        appendChangesToExistingText: false,
        linesForEditing: 0,
        maxLength: 4000,
      },
    };

    const fieldAddResult: IFieldAddResult = await list.fields.addMultilineText(
      textColumn.displayName,
      {
        Description: textColumn.description,
        Indexed: textColumn.indexed,
        EnforceUniqueValues: textColumn.enforceUniqueValues,
        AllowHyperlink: true,
        AppendOnly: textColumn.text.appendChangesToExistingText,
        NumberOfLines: 6, // Number of lines to display in edit form
        RestrictedMode: false, // Set to true if you need rich text
      }
    );

    console.log("Kolumna została dodana pomyślnie: ", fieldAddResult);
    alert("Kolumna została dodana pomyślnie!");
  } catch (error) {
    console.error("Kolumna nie została dodana pomyślnie!", error);
    alert("Kolumna nie została dodana pomyślnie!");
  }
}

export async function addSingleLineTextColumnToSharePoint(
  spWeb: IWeb,
  columnName: string,
  existingColumns: string[]
): Promise<void> {
  if (existingColumns.includes(columnName)) {
    alert(`Kolumna "${columnName}" już istnieje!`);
    return;
  }

  try {
    const list = spWeb.lists.getByTitle("Dane");

    const textColumn = {
      description: "This is a single-line text column",
      enforceUniqueValues: false,
      hidden: false,
      indexed: false,
      name: columnName,
      displayName: columnName,
      text: {
        allowMultipleLines: false,
        appendChangesToExistingText: false,
        linesForEditing: 0,
        maxLength: 255,
      },
    };

    const fieldAddResult: IFieldAddResult = await list.fields.addText(
      textColumn.displayName,
      {
        FieldTypeKind: 2, // 2 oznacza typ tekstowy
        Description: textColumn.description,
        Indexed: textColumn.indexed,
        EnforceUniqueValues: textColumn.enforceUniqueValues,
        MaxLength: textColumn.text.maxLength,
      }
    );

    console.log("Kolumna została dodana pomyślnie: ", fieldAddResult);
    alert("Kolumna została dodana pomyślnie!");
  } catch (error) {
    console.error("Kolumna nie została dodana pomyślnie!", error);
    alert("Kolumna nie została dodana pomyślnie!");
  }
}
