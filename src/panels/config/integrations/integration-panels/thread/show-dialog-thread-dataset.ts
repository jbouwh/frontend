import { fireEvent } from "../../../../../common/dom/fire_event";
import type { OTBRInfo } from "../../../../../data/otbr";
import type { ThreadNetwork } from "./thread-config-panel";

export interface DialogThreadDatasetParams {
  network: ThreadNetwork;
  otbrInfo?: OTBRInfo;
}

export const showThreadDatasetDialog = (
  element: HTMLElement,
  dialogParams: DialogThreadDatasetParams
): void => {
  fireEvent(element, "show-dialog", {
    dialogTag: "ha-dialog-thread-dataset",
    dialogImport: () => import("./dialog-thread-dataset"),
    dialogParams,
  });
};
