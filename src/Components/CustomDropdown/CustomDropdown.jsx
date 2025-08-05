import { StyledDropdown } from "./CustomDropdown.styles";

const CustomDropdown = ({ items, label, icon }) => {
  return (
    <>
      <StyledDropdown placement="bottomRight" menu={{ items }}>
        <div className="lang-selector" onClick={(e) => console.log(e)}>
          <span>{label}</span>
          {icon}
        </div>
      </StyledDropdown>
    </>
  );
};

export default CustomDropdown;
