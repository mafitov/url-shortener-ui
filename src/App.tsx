import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface ShortenResponse {
    shortUrl: string;
}

const App: React.FC = () => {
    const [longUrl, setLongUrl] = useState<string>("");
    const [shortUrl, setShortUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false);

    const handleShorten = async (): Promise<void> => {
        if (!longUrl.trim()) {
            setError("Please enter a valid URL");
            return;
        }

        setError("");
        setShortUrl("");
        setLoading(true);

        try {
            const response = await fetch("https://8m4dk7ug52.execute-api.eu-central-1.amazonaws.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ longUrl: longUrl }),
            });

            const data: ShortenResponse = await response.json();

            if (data.shortUrl) {
                setShortUrl(data.shortUrl);
            } else {
                throw new Error("Failed to shorten URL");
            }
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unexpected error occurred";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (): void => {
        if (!shortUrl) return;
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#f9fafb"
            p={3}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: "100%",
                    maxWidth: 500,
                    borderRadius: 3,
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    🔗 URL Shortener
                </Typography>

                <TextField
                    fullWidth
                    label="Enter a long URL"
                    variant="outlined"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleShorten}
                    disabled={loading}
                    sx={{ mb: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Shorten URL"}
                </Button>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {shortUrl && (
                    <Paper
                        variant="outlined"
                        sx={{
                            mt: 3,
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ color: "primary.main", wordBreak: "break-all" }}
                        >
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                                {shortUrl}
                            </a>
                        </Typography>
                        <IconButton onClick={handleCopy} color="primary">
                            <ContentCopyIcon />
                        </IconButton>
                    </Paper>
                )}
            </Paper>

            <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={() => setCopied(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Short URL copied!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default App;
