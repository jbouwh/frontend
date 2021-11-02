import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { HomeAssistant } from "../../../types";
import { processConfigEntities } from "../common/process-config-entities";
import "../components/hui-buttons-base";
import "../../../components/ha-chip";
import "../../../components/ha-icon";
import { EntityConfig } from "../entity-rows/types";
import { LovelaceHeaderFooter } from "../types";

import { ButtonsHeaderFooterConfig } from "./types";
import { domainIcon } from "../../../common/entity/domain_icon";
import { computeDomain } from "../../../common/entity/compute_domain";

@customElement("hui-buttons-header-footer")
export class HuiButtonsHeaderFooter
  extends LitElement
  implements LovelaceHeaderFooter
{
  public static getStubConfig(): Record<string, unknown> {
    return { entities: [] };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _configEntities?: EntityConfig[];

  public getCardSize(): number {
    return 3;
  }

  public setConfig(config: ButtonsHeaderFooterConfig): void {
    this._configEntities = processConfigEntities(config.entities).map(
      (entityConfig) => ({
        tap_action: { action: "toggle" },
        hold_action: { action: "more-info" },
        ...entityConfig,
      })
    );
  }

  protected render(): TemplateResult | void {
    return html`
      ${this._configEntities?.map((entity) => {
        const stateObj = this.hass!.states[entity.entity];
        const icon = entity.icon || stateObj?.attributes.icon;
        return html`
          <ha-chip hasIcon>
            ${icon
              ? html`<ha-icon slot="icon" .icon=${icon}></ha-icon>`
              : html`<ha-svg-icon
                  slot="icon"
                  .path=${domainIcon(computeDomain(entity.entity))}
                ></ha-svg-icon>`}
            ${entity.name}
          </ha-chip>
        `;
      })}
    `;
    return html`
      <hui-buttons-base
        .hass=${this.hass}
        .configEntities=${this._configEntities}
      ></hui-buttons-base>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-buttons-header-footer": HuiButtonsHeaderFooter;
  }
}
