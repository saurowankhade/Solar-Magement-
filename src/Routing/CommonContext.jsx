import TrackSolarContextProvider from '../Context/TrackSolarContext/TrackSolarContextProvider'
import MaterialDetails from '../Components/MaterialComponent/CreateMaterial/MaterialDetails'
import PrivateRoute from './PrivateRoute'
import ConcreteContextProvider from '../Context/ConcreteMaterial/ConcreteContextProvider'
import ElectricContextProvider from '../Context/ElectricMaterial/ElectricContextProvider'
import StructureContextProvider from '../Context/StructureMaterial/StructureContextProvider'

const CommonContext = ({children}) => {
  return (
    <PrivateRoute>
        <TrackSolarContextProvider>
        <ConcreteContextProvider>
            <ElectricContextProvider>
                <StructureContextProvider>
                    {children}
                </StructureContextProvider>
            </ElectricContextProvider>
        </ConcreteContextProvider>
        </TrackSolarContextProvider>
    </PrivateRoute>
  )
}

export default CommonContext
