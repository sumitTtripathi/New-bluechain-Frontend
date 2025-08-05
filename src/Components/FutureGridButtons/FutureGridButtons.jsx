import {
  ButtonContainer,
  LongButton,
  NeutralButton,
  ShortButton,
} from "../AdvancedCalculatorModal/AdvancedCalculatorModal.style";

const FutureGridButtons = ({ setActive, active }) => {
  return (
    <ButtonContainer active={active === "long"}>
      <LongButton
        onClick={() => {
          setActive("long");
        }}
        className="long-btn"
        active={active === "long"}
      >
        Long
      </LongButton>
      <ShortButton
        onClick={() => {
          setActive("short");
        }}
        className="short-btn"
        active={active === "short"}
      >
        Short
      </ShortButton>
      <NeutralButton
        onClick={() => {
          setActive("neutral");
        }}
        className="short-btn"
        active={active === "neutral"}
      >
        Neutral
      </NeutralButton>
    </ButtonContainer>
  );
};

export default FutureGridButtons;
