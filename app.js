window.addEventListener('load', () => {
    if (navigator.geolocation) {
        let latitude
        let longitude

        let temperaturaValor = document.getElementById('temperaturaValor')
        let temperaturaDesc = document.getElementById('temperaturaDesc')

        let ubicacion = document.getElementById('ubicacion')
        let iconoAnimado = document.getElementById('iconoAnimado')

        let vientoVelocidad = document.getElementById('vientoVelocidad')

        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position.coords.latitude)
            latitude = position.coords.latitude
            longitude = position.coords.longitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&units=metric&appid=22178438cdcb5ad97aa1ca2177c293e7`
            // const url = `https://api.openweathermap.org/data/2.5/weather?q=Mendoza&lang=es&units=metric&appid=22178438cdcb5ad97aa1ca2177c293e7`

            console.log(url)

            fetch(url)
                .then(response => { return response.json() })
                .then(data => {
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp}°C`

                    let desc = data.weather[0].description
                    temperaturaDesc.textContent = desc

                    ubicacion.textContent = data.name

                    console.log(data.wind.speed)
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`

                    //ICONOS ESTÁTICOS 
                    // let iconCode = console.log(data.weather[0].icon)
                    // const urlIcon = `https://openweathermap.org/img/wn/${iconCode}.png`

                    //ICONOS ANIMADOS 
                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src = 'icons/animated/thunder.svg'
                            console.log('TORMENTA');
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = 'icons/animated/rainy-2.svg'
                            console.log('LLOVIZNA');
                            break;
                        case 'Rain':
                            iconoAnimado.src = 'icons/animated/rainy-7.svg'
                            console.log('LLUVIA');
                            break;
                        case 'Snow':
                            iconoAnimado.src = 'icons/animated/snowy-6.svg'
                            console.log('NIEVE');
                            break;
                        case 'Clear':
                            iconoAnimado.src = 'icons/animated/day.svg'
                            console.log('LIMPIO');
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = 'icons/animated/weather.svg'
                            console.log('ATMOSFERA');
                            break;
                        case 'Clouds':
                            iconoAnimado.src = 'icons/animated/cloudy-day-1.svg'
                            console.log('NUBES');
                            break;
                        default:
                            iconoAnimado.src = 'icons/animated/cloudy-day-1.svg'
                            console.log('por defecto');
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
})