# Architecture

This page describes the internal design of `OTPTextView` at a high level. Only the public API (`OTPTextView`, `OTPTextViewProps`, `OTPTextViewRef`) is exported from the package.

## Component Structure

```mermaid
flowchart TB
    subgraph Public["Public API"]
        Component["OTPTextView"]
        Props["OTPTextViewProps"]
        RefHandle["OTPTextViewRef"]
    end

    subgraph Internal["Internal State"]
        OTPState["otpText: string[]"]
        FocusState["focusedInput: number"]
        InputRefs["inputs: TextInput[]"]
    end

    subgraph Logic["Internal Logic"]
        Validate["Input validator"]
        Paste["Paste distributor"]
        FocusMgr["Focus manager"]
        TintCheck["Tint color validator"]
    end

    Component --> Props
    Component --> RefHandle
    RefHandle -->|"clear / setValue / focus"| Component
    Component --> OTPState
    Component --> FocusState
    Component --> InputRefs
    Component --> Validate
    Component --> Paste
    Component --> FocusMgr
    Component --> TintCheck
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Cell as TextInput Cell[i]
    participant OTP as OTPTextView
    participant Parent as Parent Component

    User->>Cell: Type character
    Cell->>OTP: onChangeText(text, i)
    OTP->>OTP: Validate (keyboard-aware)

    alt Invalid
        OTP-->>Cell: Ignore
    else Paste (len > cellLength)
        OTP->>OTP: Sanitize & chunk text
        OTP->>OTP: Update all cells
        OTP->>Parent: handleTextChange
    else Single char
        OTP->>OTP: Update otpText[i]
        OTP->>Parent: handleTextChange
        OTP->>Parent: handleCellTextChange (optional)
        OTP->>Cell: Focus cell[i+1] if full
    end

    User->>Cell: Backspace
    Cell->>OTP: onKeyPress
    alt Current empty & prev full
        OTP->>OTP: Trim previous cell
        OTP->>Parent: handleTextChange
        OTP->>Cell: Focus cell[i-1]
    end
```

## Ref Handle Flow

```mermaid
flowchart LR
    Ref["OTPTextViewRef"] --> Clear["clear()"]
    Ref --> SetValue["setValue(text)"]
    Ref --> Focus["focus()"]

    Clear --> Reset["otpText = empty[]"]
    Clear --> Notify["handleTextChange('')"]
    Clear --> FocusFirst["focus cell[0]"]

    SetValue --> Sanitize["sanitize by keyboardType"]
    SetValue --> Chunk["split into cells"]
    SetValue --> NotifyFull["handleTextChange(value)"]

    Focus --> FocusFirst
```

## Validation Rules

| `keyboardType` | Accepted characters |
|----------------|---------------------|
| `numeric`, `number-pad`, `phone-pad`, `decimal-pad` | Digits `0-9` |
| All other types | Alphanumeric `0-9`, `a-z`, `A-Z` |

Pasted text is sanitized before distribution across cells.

## Build Output

The published npm package contains:

- `lib/commonjs/` — CommonJS bundle
- `lib/module/` — ESM bundle
- `lib/typescript/` — Type declarations

Source maps are **not** published. The `src/` directory is included for transparency but is not part of the runtime import path.

## Design Decisions

1. **Pure JS component** — no native modules, ensuring Expo compatibility.
2. **Imperative ref API** — enables programmatic clear/set for verification retry flows.
3. **Cell-based state** — each digit is a separate `TextInput` for native keyboard and accessibility behavior.
4. **Paste as first-class** — multi-character input is detected and distributed automatically.
