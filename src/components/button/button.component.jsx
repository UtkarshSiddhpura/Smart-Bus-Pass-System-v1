import './button.styles.scss'

const Button = ({ children, buttonType, ...otherProps }) => {
	return(
		<button className={`${buttonType} button`} {...otherProps} >
			{children}
		</button>
	);
}

export default Button;