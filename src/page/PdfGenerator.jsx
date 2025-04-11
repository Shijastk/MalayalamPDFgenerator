import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Slider,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardMedia,
  CssBaseline,
} from "@mui/material";
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  Title as TitleIcon,
  Download,
  Preview as PreviewIcon,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import img1 from "./assets/image1.jpg";
import img2 from "./assets/image2.jpg";

// Import the font file directly
import rachanaFont from "./fonts/Rachana-Regular.ttf";

// Create a theme with custom font
const theme = createTheme({
  typography: {
    fontFamily: '"Rachana", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#388e3c",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Rachana';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${rachanaFont}) format('truetype');
        }
      `,
    },
  },
});

function PdfGenerator() {
const [heading, setHeading] = useState("Enter your heading here");
  const [description, setDescription] = useState("Description goes here.");
  const [subtext, setSubtext] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("bg1.png");
  const [headingFontSize, setHeadingFontSize] = useState(28);
  const [descriptionFontSize, setDescriptionFontSize] = useState(20);
  const [subtextFontSize, setSubtextFontSize] = useState(16);
  const [headingColor, setHeadingColor] = useState("#333");
  const [descriptionColor, setDescriptionColor] = useState("#555");
  const [subtextColor, setSubtextColor] = useState("#777");
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [verticalPosition, setVerticalPosition] = useState(150);
  const [horizontalAlignment, setHorizontalAlignment] = useState("center");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // Theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#388e3c",
      },
    },
  });

  useEffect(() => {
    if (window.pdfMake) {
      window.pdfMake.vfs = pdfMake.vfs;
      window.pdfMake.fonts = {
        Rachana: {
          normal: "Rachana-Regular.ttf",
          bold: "Rachana-Bold.ttf",
        },
      };
    }
  }, []);

  const getPdfDefinition = () => {
    return {
      pageSize: "A4",
      content: [
        {
          stack: [
            {
              text: heading,
              fontSize: headingFontSize,
              bold: true,
              color: headingColor,
              margin: [0, 0, 0, 20],
              alignment: horizontalAlignment,
            },
            {
              text: description,
              fontSize: descriptionFontSize,
              color: descriptionColor,
              margin: [0, 0, 0, 15],
              alignment: horizontalAlignment,
            },
            {
              text: subtext,
              fontSize: subtextFontSize,
              color: subtextColor,
              alignment: horizontalAlignment,
            },
          ],
          absolutePosition: { x: 40, y: verticalPosition },
        },
      ],
      background: function (currentPage) {
        if (currentPage === 1) {
          return {
            image: selectedBackground,
            width: 595,
            height: 838,
            absolutePosition: { x: 0, y: 0 },
          };
        }
        return null;
      },
      defaultStyle: {
        font: "Rachana",
      },
      images: {
        "bg1.png": "bg1.png",
        "bg2.png": "bg2.png",
      },
      watermark: watermarkText
        ? {
            text: watermarkText,
            color: "gray",
            opacity: watermarkOpacity,
            bold: true,
            fontSize: 60,
          }
        : undefined,
    };
  };


  const generatePDF = () => {
    const docDefinition = getPdfDefinition();
    window.pdfMake.createPdf(docDefinition).download("letterpad.pdf");
  };

  const previewPDF = () => {
    setPreviewData({
      heading,
      description,
      subtext,
      headingColor,
      descriptionColor,
      subtextColor,
      headingFontSize,
      descriptionFontSize,
      subtextFontSize,
      horizontalAlignment,
      background: selectedBackground === "bg1.png" ? img1 : img2,
      watermark: watermarkText
        ? {
            text: watermarkText,
            opacity: watermarkOpacity,
          }
        : null,
    });
    setPreviewOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          <TitleIcon sx={{ mr: 1 }} /> Letterpad Creator
        </Typography>

        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Heading"
                variant="outlined"
                margin="normal"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                sx={{ fontFamily: "Rachana" }}
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={2}
                sx={{ fontFamily: "Rachana" }}
              />
              <TextField
                fullWidth
                label="Subtext"
                variant="outlined"
                margin="normal"
                value={subtext}
                onChange={(e) => setSubtext(e.target.value)}
                sx={{ fontFamily: "Rachana" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Background
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card
                    raised={selectedBackground === img1}
                    onClick={() => setSelectedBackground("bg1.png")}
                    sx={{
                      cursor: "pointer",
                      border: selectedBackground === "bg1.png" ? 2 : 0,
                      borderColor: "primary.main",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={img1}
                      alt="Background 1"
                    />
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card
                    raised={selectedBackground === img2}
                    onClick={() => setSelectedBackground("bg2.png")}
                    sx={{
                      cursor: "pointer",
                      border: selectedBackground === "bg2.png" ? 2 : 0,
                      borderColor: "primary.main",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={img2}
                      alt="Background 2"
                    />
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Font Sizes
              </Typography>
              <Typography variant="body2">
                Heading: {headingFontSize}px
              </Typography>
              <Slider
                value={headingFontSize}
                onChange={(e, newValue) => setHeadingFontSize(newValue)}
                min={16}
                max={48}
                valueLabelDisplay="auto"
                aria-labelledby="heading-font-size"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2">
                Description: {descriptionFontSize}px
              </Typography>
              <Slider
                value={descriptionFontSize}
                onChange={(e, newValue) => setDescriptionFontSize(newValue)}
                min={12}
                max={36}
                valueLabelDisplay="auto"
                aria-labelledby="description-font-size"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2">
                Subtext: {subtextFontSize}px
              </Typography>
              <Slider
                value={subtextFontSize}
                onChange={(e, newValue) => setSubtextFontSize(newValue)}
                min={8}
                max={24}
                valueLabelDisplay="auto"
                aria-labelledby="subtext-font-size"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Text Colors
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Heading:
                </Typography>
                <input
                  type="color"
                  value={headingColor}
                  onChange={(e) => setHeadingColor(e.target.value)}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Description:
                </Typography>
                <input
                  type="color"
                  value={descriptionColor}
                  onChange={(e) => setDescriptionColor(e.target.value)}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Subtext:
                </Typography>
                <input
                  type="color"
                  value={subtextColor}
                  onChange={(e) => setSubtextColor(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Position & Alignment
              </Typography>
              <Typography variant="body2">
                Vertical Position: {verticalPosition}px
              </Typography>
              <Slider
                value={verticalPosition}
                onChange={(e, newValue) => setVerticalPosition(newValue)}
                min={100}
                max={600}
                valueLabelDisplay="auto"
                aria-labelledby="vertical-position"
                sx={{ mb: 2 }}
              />
              <ToggleButtonGroup
                value={horizontalAlignment}
                exclusive
                onChange={(e, newValue) => {
                  if (newValue !== null) setHorizontalAlignment(newValue);
                }}
                aria-label="text alignment"
                sx={{ mb: 2 }}
              >
                <ToggleButton value="left" aria-label="left aligned">
                  <FormatAlignLeft />
                </ToggleButton>
                <ToggleButton value="center" aria-label="centered">
                  <FormatAlignCenter />
                </ToggleButton>
                <ToggleButton value="right" aria-label="right aligned">
                  <FormatAlignRight />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Watermark
              </Typography>
              <TextField
                fullWidth
                label="Watermark Text"
                variant="outlined"
                margin="normal"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
              />
              <Typography variant="body2">
                Opacity: {watermarkOpacity.toFixed(1)}
              </Typography>
              <Slider
                value={watermarkOpacity}
                onChange={(e, newValue) => setWatermarkOpacity(newValue)}
                min={0.1}
                max={0.9}
                step={0.1}
                valueLabelDisplay="auto"
                aria-labelledby="watermark-opacity"
              />
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PreviewIcon />}
            onClick={previewPDF}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Download />}
            onClick={generatePDF}
          >
            Download PDF
          </Button>
        </Box>

        {/* Preview Dialog */}
        <Dialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h5" component="div">
              <PreviewIcon sx={{ mr: 1 }} /> Preview
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                width: "100%",
                minWidth: "595px",
                height: "838px",
                position: "relative",
                border: "1px solid #ccc",
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
              }}
            >
              {/* Background Image */}
              <Box
                component="img"
                src={img1}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />

              {/* Watermark */}
              {watermarkText && (
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotate(-45deg)",
                    fontSize: "3rem",
                    color: "gray",
                    opacity: watermarkOpacity,
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "center",
                    pointerEvents: "none",
                    fontFamily: "Rachana",
                  }}
                >
                  {watermarkText}
                </Typography>
              )}

              {/* Content */}
              <Box
                sx={{
                  position: "absolute",
                  top: `${verticalPosition}px`,
                  left: 0,
                  width: "100%",
                  padding: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: `${headingFontSize}px`,
                    color: headingColor,
                    fontWeight: "bold",
                    mb: 2,
                    textAlign: horizontalAlignment,
                    fontFamily: "Rachana",
                  }}
                >
                  {heading}
                </Typography>

                <Typography
                  sx={{
                    fontSize: `${descriptionFontSize}px`,
                    color: descriptionColor,
                    mb: 1.5,
                    textAlign: horizontalAlignment,
                    fontFamily: "Rachana",
                  }}
                >
                  {description}
                </Typography>

                <Typography
                  sx={{
                    fontSize: `${subtextFontSize}px`,
                    color: subtextColor,
                    textAlign: horizontalAlignment,
                    fontFamily: "Rachana",
                  }}
                >
                  {subtext}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreviewOpen(false)}>Close</Button>
            <Button variant="contained" color="secondary" onClick={generatePDF}>
              Download PDF
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default PdfGenerator;
