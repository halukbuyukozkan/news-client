import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { DataGrid } from "@mui/x-data-grid";
import { getNews } from "src/app/services/newsService/newsService";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

function ExamplePage(props) {
  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews().then((data) => {
      setNews(data);
    });
  }, []);

  const columns = [
    { field: "source", headerName: "Source", width: 130 },
    { field: "author", headerName: "Author", width: 130 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "publishedAt", headerName: "Published At", width: 130 },
  ];

  const rows = news.map((item) => {
    return {
      id: item.title,
      source: item.source,
      author: item.author,
      title: item.title,
      category: item.category,
      publishedAt: item.publishedAt,
    };
  });

  const test = [
    {
      id: 1,
      source: "CNN",
      author: "John Doe",
      title: "Lorem Ipsum",
      category: "News",
      publishedAt: "2021-10-10",
    },
  ];

  const theme = useTheme();
  const { t } = useTranslation("examplePage");

  return (
    <Root
      header={
        <div className="p-24">
          <h4>Dashboard</h4>
        </div>
      }
      content={
        <div className="p-24 w-full flex flex-col">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default ExamplePage;
