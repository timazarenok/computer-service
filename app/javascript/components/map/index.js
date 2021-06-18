import React from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

const MyMap = () => (
    <YMaps>
        <Map width='100%' height='400px' defaultState={{center: [53.902236, 27.545848], zoom: 15.4}}>
            <Placemark geometry={[53.902236, 27.549848]} options={{
                preset: "islands#yellowStretchyIcon"
            }} />
        </Map>
    </YMaps>
)

export default MyMap