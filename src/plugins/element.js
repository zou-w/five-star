import Vue from 'vue'
import {
  Button,
  Message,
  MessageBox,
  Header,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  Avatar,
  Main,
  Footer,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Select,
  Tag,
  Option,
  Tooltip,
  Steps,
  Step,
  Badge,
  Tabs,
  TabPane,
  Upload,
  Switch
} from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Avatar)
Vue.use(Main)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Tag)
Vue.use(Option)
Vue.use(Tooltip)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Footer)
Vue.use(Badge)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.use(Switch)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(infiniteScroll)
