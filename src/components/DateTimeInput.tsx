import React, { useState, useEffect } from 'react'
import { Flex, SelectField } from '@aws-amplify/ui-react'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'

function DateTimeInput (props: DateTimeInputProps) {
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null)
    const [availableMinutes, setAvailableMinutes] = useState<number>(0)

    useEffect(() => {
        console.log('DateTimeInput', props.reservations)
    }, [props])

    // For DatePicker
    function disabledDate(current: moment.Moment) {
        // Can not select sundays and predfined days
        return (current < moment().subtract(1, 'days')
        || current > moment().add(3, 'months'))
    }

    // For TimePicker
    const outOfServiceHours =  () => {
        return [0, 1, 2, 3, 4, 5, 6, 22, 23]
    }
    function disabledDateTime() {
        return {
        disabledHours: () => outOfServiceHours(),
        disabledMinutes: (selectedHour: number) => {
            return outOfServiceMinutes(selectedHour)
        },
        };
    }
    const outOfServiceMinutes = (selectedHour: number) => {
        const reservationHours = props.reservations.filter((reservation) => 
            moment(reservation.date).isSame(selectedDate, 'day')
        )

        const unavaliableMinutes: number[] = []
        const selectedTime = selectedDate?.clone()
        selectedTime?.add(selectedHour, 'hours')

        reservationHours.forEach(reservation => {
            const start = moment(reservation.date + ' ' + reservation.time)
            const end = start.clone().add(reservation.duration, 'minutes')

            for (let min = 0; min < 60; min+=30) {
                selectedTime?.add(min, 'minutes')
                if (selectedTime?.isSameOrAfter(start) && selectedTime?.isBefore(end)) {
                    unavaliableMinutes.push(min)
                }
            }
        });
        return unavaliableMinutes;
    }

    // For SelectField
    const getAvailableMinutes = (selectedDate : moment.Moment) => {
        let minMinutes = 120;

        props.reservations.filter((reservation) => (
            moment(reservation.date).isSame(selectedDate, 'day') && 
            moment(reservation.date + ' ' + reservation.time).isAfter(selectedDate))
        ).map(reservation => {
            console.log('Reservation Hour ', reservation.date + ' ' + reservation.time)
            console.log('Request Hour ', selectedDate?.format('YYYY-MM-DD HH:mm'))
            const timeDifference = moment(reservation.date + ' ' + reservation.time).diff(selectedDate, 'minutes')
            console.log('Time Difference ', timeDifference)
            if (timeDifference < minMinutes) minMinutes = timeDifference;
        })
        setAvailableMinutes(minMinutes);
    }
    const options = () => {
        const options = []
        for (let i = 30; i <= availableMinutes; i += 30) {
        options.push(<option key={i} value={i}>{i} minutos</option>)
        }
        return options
    }

    return (
        <Flex direction='column'>
            <DatePicker
            disabledDate={disabledDate}
            onChange={(date) => {
                let dateStr:string = date?.format('YYYY-MM-DD') || '';
                if (dateStr == '') {
                    setSelectedDate(null)
                } else {
                    setSelectedDate(moment(dateStr + ' 00:00'))
                }
                setAvailableMinutes(0)
                props.onDurationChange(0)
                props.onDateChange(dateStr)
            }}
            />
            <TimePicker
            disabled={selectedDate === null}
            format='HH:mm'
            disabledTime={disabledDateTime}
            minuteStep={30}
            size='large'
            onChange={(time) => {
                let timeStr:string = time?.format('HH:mm') || '';
                console.log('Time', timeStr)
                const newSelectedDate = selectedDate?.format('YYYY-MM-DD') + ' ' + timeStr
                setSelectedDate(moment(newSelectedDate))
                props.onTimeChange(timeStr)
                getAvailableMinutes(moment(newSelectedDate))
                if (timeStr == '') {
                    console.log('Time', timeStr)
                    setAvailableMinutes(0) 
                    props.onDurationChange(0)
                }
            }}
            />
            <SelectField 
            label={undefined}
            onChange={(e) => {
                props.onDurationChange(parseInt(e.target.value))
            }}
            >
            <option key={0} value=''>Selecciona una opción</option>
            {options()}                
            </SelectField>
        </Flex>
    )
}

export default DateTimeInput
export interface DateTimeInputProps {
    reservations: Reservation[]
    onDateChange: (date: string) => void
    onTimeChange: (time: string) => void
    onDurationChange: (duration: number) => void
}
interface Reservation {
    date: string
    time: string
    duration: number
}
