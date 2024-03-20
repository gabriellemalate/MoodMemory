import './EmotionMap.scss';

function EmotionMap() {
    const [sleepHoursTouched, setSleepHoursTouched] = useState(false); // Step 1

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setSleepHoursTouched(true); // Mark sleep hours as touched when form is submitted

        // Other code remains unchanged

        if (formData.hours === '0' && !sleepHoursTouched) { // Step 2
            setErrors((prevErrors) => ({ ...prevErrors, hours: '*Select the number of hours slept' }));
            formIsValid = false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, hours: '' }));
        }

        // Other code remains unchanged
    };
    return (
        <>
            <div className='add-mood-quick__sleep-form-hours'>
                <label htmlFor="hoursSlept" className='add-mood-quick__sleep-form-hours-head'>
                    Hours Slept {(!formData.hours && sleepHoursTouched) && <span className="required">*</span>} {/* Step 3 */}
                </label>
                <select
                    id="hoursSlept"
                    className='add-mood-quick__sleep-form-hours-menu'
                    onChange={(e) => handleNumberChange('hours', parseInt(e.target.value))}
                >
                    {/* Dropdown options remain unchanged */}
                </select>
                {errors.hours && <div className="error">{errors.hours}</div>} {/* Render error message */}
            </div>
        </>
    )
}

export default EmotionMap;