type FormInputProps = {
	label: string;
	name: string;
	type: string;
	hookForm: any;
};

const FormInput: React.FC<FormInputProps> = ({label, name, type, hookForm}) => {
	return (
		<div className="mb-4">
			<label htmlFor={name} className="text-white mr-4">
				{label}
			</label>
			<input
				className="rounded p-1 w-72"
				type={type}
				id={name}
				x
				{...hookForm.register(name)}
			/>
		</div>
	);
};

export default FormInput;
