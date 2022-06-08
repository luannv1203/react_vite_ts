import { RouteObject } from 'react-router-dom'

class RouterConfig implements RouteObject {
  path?: string
  isAuth?: boolean | false
}

export default RouterConfig
