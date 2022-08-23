import { ICategory } from "../interfaces/category.interface";

import SavingsIcon from '../img/icono_ahorro.svg';
import FoodIcon from '../img/icono_comida.svg';
import HousingIcon from '../img/icono_casa.svg';
import TransportationIcon from '../img/icono_ocio.svg';
import UtilitiesIcon from '../img/icono_ocio.svg';
import InsuranceIcon from '../img/icono_ocio.svg';
import PersonalIcon from '../img/icono_ocio.svg';
import EducationIcon from '../img/icono_ocio.svg';
import HealthCareIcon from '../img/icono_salud.svg';
import EntertainmentIcon from '../img/icono_suscripciones.svg';

export const categoryList: ICategory[] = [
    {
        value: 'savings',
        name: 'Savings',
        example: '(e.g. emergency fund)',
        icon: SavingsIcon
    },
    {
        value: 'food',
        name: 'Food',
        example: null,
        icon: FoodIcon
    },
    {
        value: 'housing',
        name: 'Housing',
        example: '(e.g. property taxes, mortgage or rent)',
        icon: HousingIcon
    },
    {
        value: 'transportation',
        name: 'Transportation',
        example: '(e.g. car payment, gas)',
        icon: TransportationIcon
    },
    {
        value: 'healthcare',
        name: 'Medical/Healthcare',
        example: '(e.g. primary care, dental dare)',
        icon: HealthCareIcon
    },
    {
        value: 'utilities',
        name: 'Utilities',
        example: '(e.g. internet, electricity, water)',
        icon: UtilitiesIcon
    },
    {
        value: 'insurance',
        name: 'Insurance',
        example: '(e.g. health ensurance)',
        icon: InsuranceIcon
    },
    {
        value: 'personal',
        name: 'Personal',
        example: '(e.g. gym, haircut, clothing)',
        icon: PersonalIcon
    },
    {
        value: 'education',
        name: 'Education',
        example: '(e.g. books, college)',
        icon: EducationIcon
    },
    {
        value: 'enternainment',
        name: 'Entertainment',
        example: '(e.g. Netflix)',
        icon: EntertainmentIcon
    }
]