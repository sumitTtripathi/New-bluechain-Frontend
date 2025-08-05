import {
  ButtonContainer,
  LongButton,
  ShortButton,
} from "../AdvancedCalculatorModal.style";

const PeriodButtons = ({ setActive, active }) => {
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
    </ButtonContainer>
  );
};

export default PeriodButtons;
