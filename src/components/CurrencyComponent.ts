import { IGenericComponent } from "../@types";
import { CurrencyCodes } from "../utils/CurrencyCodes";

export class CurrencyComponent implements IGenericComponent {
  amountMultipliedBy1000 = 0;
  fallbackValue = "";
  type: "body" | "header" = "body";
  currencyCode: CurrencyCodes = "USD";

  setAmountMultiplieBy1000(amount: number): this {
    this.amountMultipliedBy1000 = amount;

    return this;
  }

  setFallbackValue(fallbackValue: string): this {
    this.fallbackValue = fallbackValue;

    return this;
  }

  setCurrencyCode(currencyCode: CurrencyCodes): this {
    this.currencyCode = currencyCode;

    return this;
  }

  setType(type: "body" | "header"): this {
    this.type = type;

    return this;
  }

  toAPIObject() {
    return {
      type: this.type,
      parameters: [
        {
          type: "currency",
          currency: {
            fallback_value: this.fallbackValue,
            code: this.currencyCode,
            amount_1000: this.amountMultipliedBy1000,
          },
        },
      ],
    };
  }
}
