import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FaHome, FaShoppingCart, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../../app/services/usersApi'
import { logout } from '../../features/authSlice'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart.items || [])

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    try {

      await logoutApiCall().unwrap();

      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='d-flex align-items-center gap-1'>
              <FaHome size={25} /> Main
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse>
            <Nav className='ms-auto'>
              {userInfo && (
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <FaShoppingCart size={20} /> Cart
                    {cartItems?.length > 0 && (
                      <Badge bg='light' text='dark' className='ms-1'>
                        {cartItems.length}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/products/my'>
                    <NavDropdown.Item>My Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orders'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <FaSignOutAlt /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  )
}
export default Header
