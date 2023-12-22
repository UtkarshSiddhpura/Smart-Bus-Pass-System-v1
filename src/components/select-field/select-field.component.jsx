import FormInput from "../form-input/form-input.component";
import "./select-field.styles.css";

const Select = ({ name, selectOptions, handleInputChange }) => {
	return (
		<>
			<select className="form-input select-input" required>
				{selectOptions.map((option) => (
					<option value={option["college_name"]} key={option["s_no_"]}>
						{option["college_name"]}
					</option>
				))}
			</select>
			<label className="form-input-label clg">Select College</label>
		</>
	);
};

export default Select;
