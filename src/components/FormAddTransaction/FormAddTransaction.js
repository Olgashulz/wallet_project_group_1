
import { useState } from "react";
import { useDispatch } from "react-redux";
import Select from 'react-select'
import { stylesSelect } from './stylesForSelect'
import "react-datetime/css/react-datetime.css";

import showModal from '../../redux/modal/modalActions';
import addTransaction from "../../redux/form/formOperations";

import { ReactComponent as Plus } from '../../icons/plus.svg'
import { ReactComponent as Minus } from '../../icons/minus.svg'
import { ReactComponent as CalendarIcon } from '../../icons/calendar.svg'
import { ReactComponent as Close } from '../../icons/close.svg'

import Button from '../Button';
import DatePicker from '../DatePicker';
import styles from './FormAddTransaction.module.css';

export default function ModalAddTransaction(props) {

    const defaultTransactionState = {
        type: false,
        sum: '',
        date: new Date(),
        comment: '',
        category: 'Вasic costs',
    }

    const [transaction, setTransaction] = useState(defaultTransactionState);
    const dispatch = useDispatch();

    const categories = [
        { value: "Main", label: "Вasic costs", type: false },
        { value: "Food", label: "Food", type: false },
        { value: "Car", label: "Авто", type: false },
        { value: "Development", label: "Развитие", type: false },
        { value: "Children", label: "Дети", type: false },
        { value: "Home", label: "Дом", type: false },
        { value: "Education", label: "Образование", type: false },
        { value: "Other", label: "Остальные", type: false },
        { value: "Regular income", label: "Regular income", type: true },
        { value: "Additional income", label: "Additional income", type: true },
    ]


    const handleInputChange = event => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'type':
                if (transaction.type === false) {
                    updateTransaction(name, true)
                }
                else {
                    updateTransaction(name, false)
                }
                break;

            case 'sum':
                updateTransaction(name, value)
                break;

            case 'comment':
                updateTransaction(name, value)
                break;

            default:
                return;
        }
    }

    const updateTransaction = (name, value) => {
        setTransaction((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTransaction = {
            ...transaction,
            type: transaction.type,
            sum: transaction.sum,
            date: transaction.date.toLocaleDateString(),
            month: transaction.date.getMonth() + 1,
            year: transaction.date.getFullYear(),
            comment: transaction.comment,
            category: transaction.category,

        }
        console.log(newTransaction)

        // dispatch(addTransaction(newTransaction));
        resetForm();
    }

    const resetForm = (event) => {
        event.preventDefault();
        setTransaction(defaultTransactionState)
    }
    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form} >

            <button className={styles.closeButton} onClick={(event) => dispatch(showModal())}>
                <Close />
            </button>
            <h4 className={styles.title}>Add transaction</h4>


            <div className={styles.swichContainer}>
                <span className={styles.swichTitle}>Income</span>

                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        name="type"
                        onChange={handleInputChange}
                        checked={!transaction.type}
                    />
                    <div className={styles.slider}>
                        <div className={styles.indicator}>
                            {transaction.type ? <Plus /> : <Minus />}
                        </div>
                    </div>
                </label>
                <span className={styles.swichTitle}>Expense</span>
            </div>


            <div className={styles.categoriesContainer}>
                <Select
                    placeholder="Select a category "
                    options={categories.filter(category => category.type === transaction.type)}
                    styles={stylesSelect()}
                    onChange={(option) => {
                        updateTransaction('category', option.value)
                    }} />
            </div>

            <div className={styles.amountAndDateContainer}>
                <div className={styles.dateContainer}>
                    <label className={styles.labelForm}>
                        <input
                            type="number"
                            name="sum"
                            placeholder='0.00'
                            className={styles.inputForm}

                            onChange={(event) => {
                                if (
                                    event.target.value === "" ||
                                    /^[0-9]*(\.[0-9]?[0-9]?)?$/.test(event.target.value)
                                ) {
                                    handleInputChange(event)
                                }
                            }}
                            required
                        />
                    </label>
                </div>

                <div className={styles.datepickerContainer}>
                    <DatePicker date={transaction.date} updateDate={updateTransaction} />
                    <CalendarIcon className={styles.calendarIcon} />
                </div>

            </div>

            <label className={styles.labelForm}>
                <input
                    type="text"
                    name="comment"
                    placeholder='Comment'
                    className={styles.inputComment}
                    onChange={handleInputChange}
                    required />
            </label>
            <Button type="submit" text="Add" color="green" />
            <Button
                text="Cancel"
                color="white"
                onClick={resetForm}
            />
        </form >
    )
}







