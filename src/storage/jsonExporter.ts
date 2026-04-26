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

export const exportDatabaseToJsonFile = async () => {
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
  const timestamp = databaseSnapshot.exportedAt
    .replace(/:/g, "-")
    .replace(/\.\d+Z$/, "Z");

  link.href = url;
  link.download = `maplelife-backup-${timestamp}.json`;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return databaseSnapshot;
};
