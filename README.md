
# react-native-dynamic-form

This package help you creating dynamic forms

## Preview 
![Animation](docs/image.gif)

## Types fields

```typescript
type typeFields =
  | 'title'
  | "text"
  | "signature"
  | "multiple_choice"
  | "single_choice"
  | "text_answer"
  | "date"
  | "date_time"
  | "time";
```
### common type
```typescript
type FieldCommonType = {
    label: string;
    name: string;
    onChange?: (newValue: string) => void;
    initialValue?: string;
    required?: boolean;
};

```

```typescript
type TitleType = {
  type: "title";
  name: string;
  labelIsHtml?: boolean;
  label: string;
};

type SignatureFieldType = FieldCommonType & {
	type: "signature";
	multiple?: boolean;
	disabledInput?: boolean;
	initialValue?: SignatureValueType[];
	optionWhoSign?: string[];
};

type OptionMultipleChoiceType = {
	label: string;
	styleLabel?: TextStyle;
	style?: ViewStyle;
	disabled?: boolean;
	checked: boolean;
};

type MultipleChoiceType = FieldCommonType & {
	type: "multiple_choice";
	options: OptionMultipleChoiceType[];
};
```
