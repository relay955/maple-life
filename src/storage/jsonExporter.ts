import type { Account } from "./dto/account";
import type { Character } from "./dto/character";
import type { Settings } from "./dto/settings";
import type { SystemInfo } from "./dto/systemInfo";
import type { Todo } from "./dto/todo";
import type { AccountWorld } from "./dto/world";
import { idb } from "./idb";

export interface JsonDatabaseExport {
  exportedAt: string;
  schemaVersion: number;
  tables: {
    account: Account[];
    accountWorld: AccountWorld[];
    character: Character[];
    todo: Todo[];
    settings: Settings[];
    systemInfo: SystemInfo[];
  };
}

export const readDatabaseAsJson = async (): Promise<JsonDatabaseExport> => {
  const [account, accountWorld, character, todo, settings, systemInfo] =
    await Promise.all([
      idb.account.toArray(),
      idb.accountWorld.toArray(),
      idb.character.toArray(),
      idb.todo.toArray(),
      idb.settings.toArray(),
      idb.systemInfo.toArray(),
    ]);

  return {
    exportedAt: new Date().toISOString(),
    schemaVersion: idb.verno,
    tables: {
      account,
      accountWorld,
      character,
      todo,
      settings,
      systemInfo,
    },
  };
};

export const exportDatabaseToJsonFile = async (additionalFileName?: string) => {
  if (typeof document === "undefined") {
    throw new Error("JSON export is only available in the app runtime.");
  }

  const databaseSnapshot = await readDatabaseAsJson();
  const jsonText = JSON.stringify(databaseSnapshot, null, 2);
  const blob = new Blob([jsonText], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const exportedDate = new Date(databaseSnapshot.exportedAt);
  const timestamp = `${exportedDate.getFullYear()}${
    `${exportedDate.getMonth() + 1}`.padStart(2, "0")
  }${`${exportedDate.getDate()}`.padStart(2, "0")}-${`${exportedDate.getHours()}`.padStart(2, "0")}${`${exportedDate.getMinutes()}`.padStart(2, "0")}${`${exportedDate.getSeconds()}`.padStart(2, "0")}`;
  const additionalNameSegment = additionalFileName
    ? `-${additionalFileName}`
    : "";

  link.href = url;
  link.download = `maplelife-backup${additionalNameSegment}-${timestamp}.json`;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return databaseSnapshot;
};
