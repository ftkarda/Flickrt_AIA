import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { NavLink } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardItem from "../components/CardItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useSearchParams } from "react-router-dom";

const theme = createTheme();
const PROD_URL = "https://flickr-server-a5a7c.herokuapp.com/"
// const DEV_URL = "http://localhost:3000/"

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");

  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  let searchTags = searchParams.get("tags") || "";

  const handleSearch = (event) => {
    // event.preventDefault();
    const tags = event.target.value;
    if (tags) {
      setSearchParams({ tags });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          PROD_URL + `feeds/?tags=${searchTags}`
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData({});
  }, [searchTags]);

  if (loading === true) {
    return <div className="loader" />;
  }

  const offset = page * limit - limit;
  const paginationPosts = data.items.slice(offset, offset + limit);

  const previousHandler = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const nextHandler = () => {
    if (page === Math.ceil(data.items.length / limit)) return;
    setPage(page + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "text-active" : "")}
                >
                  Home
                </NavLink>
              </Typography>
              <Search value={searchTags} onClick={handleSearch}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Public Feed
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {data.title}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {paginationPosts.map((item, index) => {
              return <CardItem key={index} data={item} />;
            })}
          </Grid>
        </Container>
      </main>
      <div className="center">
        <div className="pagination">
          <button onClick={previousHandler}>&laquo;</button>
          <button href="#" className="active">
            {page}
          </button>
          <button onClick={nextHandler}>&raquo;</button>
        </div>
      </div>
    </ThemeProvider>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
