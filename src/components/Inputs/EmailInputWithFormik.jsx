import PropTypes from 'prop-types';

import { InputAdornment } from '@mui/material';
import CustomTextFiledStyled from './CustomTextFiledStyled';
import { Email as EmailIcon } from '@mui/icons-material';

export default function EmailInputWithFormik({
	formik,
	autoFocus = false,
	onBlur
}) {
	return (
		<CustomTextFiledStyled
			fullWidth
			type="email"
			id="email"
			name="email"
			placeholder="E-mail"
			variant="standard"
			onChange={formik.handleChange}
			onBlur={onBlur}
			value={formik.values.email}
			error={formik.touched.email && Boolean(formik.errors.email)}
			helperText={formik.touched.email && formik.errors.email}
			autoFocus={autoFocus}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<EmailIcon />
					</InputAdornment>
				)
			}}
		/>
	);
}

EmailInputWithFormik.propTypes = {
	formik: PropTypes.shape({}).isRequired,
	autoFocus: PropTypes.bool,
	onBlur: PropTypes.func
};
