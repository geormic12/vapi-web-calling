# Vapi Knowledge Base Setup Instructions

## ✅ COMPLETED SETUP

**Your knowledge base has been successfully created with the following details:**

- **File ID:** `3f2f5f28-8e25-4599-bc8b-20a1c115b609`
- **Knowledge Base ID:** `13643ee2-571a-4be2-ba72-03cc6dd1c2ec`
- **Status:** Active and integrated with Lisa

The configuration has been automatically updated in `src/lisa.js` and the project has been rebuilt.

---

## Overview

This document provides step-by-step instructions for uploading Lisa's knowledge base to Vapi and integrating it with your agent.

## Prerequisites

- Vapi API key
- Knowledge base content file: `knowledge-base-files/lisa-integrity-coaching-kb.md`

## Step 1: Upload Knowledge Base File

### Using Vapi API (Recommended)

```bash
# Upload the knowledge base file (note: explicit content type is required)
curl -X POST "https://api.vapi.ai/file" \
  -H "Authorization: Bearer YOUR_VAPI_API_KEY" \
  -F "file=@knowledge-base-files/lisa-integrity-coaching-kb.md;type=text/markdown"
```

**Response Example:**

```json
{
  "id": "3f2f5f28-8e25-4599-bc8b-20a1c115b609",
  "name": "lisa-integrity-coaching-kb.md",
  "orgId": "0f1d9ef8-413d-4ac2-a237-35188cb84282",
  "url": "https://jtuyprjjgxbgmtjiykoa.supabase.co/storage/v1/object/public/files/1758432786966-57cf00ca-7271-4fad-acdd-b9315327cc9b.md",
  "bytes": "6579",
  "object": "file",
  "purpose": "assistant",
  "createdAt": "2025-09-21T05:33:07.388Z",
  "updatedAt": "2025-09-21T05:33:07.388Z",
  "mimetype": "text/markdown",
  "bucket": "files",
  "path": "1758432786966-57cf00ca-7271-4fad-acdd-b9315327cc9b.md",
  "status": "processing"
}
```

**Save the file ID:** `3f2f5f28-8e25-4599-bc8b-20a1c115b609`

**Important Notes:**

- The `;type=text/markdown` suffix is required to ensure proper MIME type recognition
- Without this, you'll get an error about unsupported MIME types

### Using Vapi Dashboard (Alternative)

1. Log into your Vapi dashboard
2. Navigate to Files section
3. Upload `knowledge-base-files/lisa-integrity-coaching-kb.md`
4. Copy the generated file ID

## Step 2: Create Knowledge Base

### Using Vapi API

```bash
# Create knowledge base with uploaded file (note: no description field supported)
curl -X POST "https://api.vapi.ai/knowledge-base" \
  -H "Authorization: Bearer YOUR_VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "lisa_integrity_coaching_kb",
    "provider": "google",
    "fileIds": ["3f2f5f28-8e25-4599-bc8b-20a1c115b609"]
  }'
```

**Response Example:**

```json
{
  "id": "13643ee2-571a-4be2-ba72-03cc6dd1c2ec",
  "orgId": "0f1d9ef8-413d-4ac2-a237-35188cb84282",
  "name": "lisa_integrity_coaching_kb",
  "provider": "google",
  "fileIds": ["3f2f5f28-8e25-4599-bc8b-20a1c115b609"],
  "createdAt": "2025-09-21T05:33:29.713Z",
  "updatedAt": "2025-09-21T05:33:29.713Z"
}
```

**Save the knowledge base ID:** `13643ee2-571a-4be2-ba72-03cc6dd1c2ec`

**Important Notes:**

- The `description` field is NOT supported and will cause an error
- Only `name`, `provider`, and `fileIds` are required fields

### Using Vapi Dashboard (Alternative)

1. Navigate to Knowledge Bases section
2. Click "Create Knowledge Base"
3. Fill in:
   - **Name:** `lisa_integrity_coaching_kb`
   - **Description:** `Comprehensive integrity coaching knowledge base covering ontological methodology, integrity concepts, and coaching principles`
   - **Provider:** `google`
   - **Files:** Select your uploaded file
4. Copy the generated knowledge base ID

## Step 3: Update Lisa Configuration

Edit `src/lisa.js` and update the knowledgeBaseId:

```javascript
export const lisaOptions = {
  // ... existing configuration ...
  model: {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: lisaSystemPrompt,
      },
    ],
    provider: "openai",
    functions: [
      // ... existing functions ...
    ],
    // Replace with your actual knowledge base ID
    knowledgeBaseId: "13643ee2-571a-4be2-ba72-03cc6dd1c2ec",
    maxTokens: 250,
    temperature: 0.7,
    emotionRecognitionEnabled: true,
  },
  // ... rest of configuration ...
};
```

## Step 4: Test the Integration

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Start local server:**

   ```bash
   python -m http.server 8000
   ```

3. **Open browser:** `http://localhost:8000`

4. **Test Lisa:**
   - Click "Call with Lisa"
   - Ask questions about integrity concepts
   - Verify that Lisa provides detailed, knowledge-based responses

## Expected Behavior

When the knowledge base is properly integrated:

- Lisa will automatically access the knowledge base when users ask about integrity concepts
- Responses will be more detailed and accurate
- No explicit function calls are needed - Vapi handles knowledge retrieval automatically
- Lisa will seamlessly integrate knowledge base information into her coaching conversations

## Troubleshooting

### File Upload Issues

- Ensure file is valid markdown (.md extension)
- **CRITICAL:** Use `;type=text/markdown` suffix in curl command to set proper MIME type
- Check file size limits (typically under 50MB)
- Verify API key has proper permissions
- If you get "Couldn't Upload File" with unsupported MIME type error, the content type wasn't set correctly

### Knowledge Base Creation Issues

- **CRITICAL:** Do NOT include `description` field - it's not supported and causes errors
- Confirm file ID is correct from upload response
- Ensure provider is set to "google" for standard file-based retrieval
- Check that file was uploaded successfully and status is "processing" or "ready"
- Only use `name`, `provider`, and `fileIds` fields in the request

### Integration Issues

- Verify knowledgeBaseId is correctly set in lisa.js
- Check browser console for any JavaScript errors
- Ensure npm run build completed successfully

### Testing Issues

- Try asking specific questions about integrity or coaching methodology
- Check if Lisa mentions concepts that are definitely in the knowledge base
- Verify system prompt includes knowledge base usage instructions

## Knowledge Base Content

The uploaded knowledge base includes:

- **Core Integrity Concepts:** Definitions, nature of integrity, restoration principles
- **Ontological Coaching Methodology:** Being vs. doing, language and reality, distinctions
- **Werner Erhard's Framework:** Transformation vs. change, creating vs. reacting
- **Practical Applications:** Personal inventory, workability assessment, communication completion
- **Advanced Concepts:** Context vs. content, occurrence vs. story, commitment vs. preference

## Updating Knowledge Base

To update the knowledge base content:

1. Edit `knowledge-base-files/lisa-integrity-coaching-kb.md`
2. Upload the updated file to get a new file ID
3. Update the knowledge base via API or dashboard with the new file ID
4. No code changes needed - Vapi will automatically use the updated content

## Security Notes

- Keep your Vapi API key secure and never commit it to version control
- Use environment variables for API keys in production
- Regularly review uploaded files and knowledge bases for content accuracy
- Monitor API usage and costs associated with knowledge base operations

## Working Commands Summary

For quick reference, here are the exact commands that work:

### 1. File Upload

```bash
curl -X POST "https://api.vapi.ai/file" \
  -H "Authorization: Bearer YOUR_VAPI_API_KEY" \
  -F "file=@knowledge-base-files/lisa-integrity-coaching-kb.md;type=text/markdown"
```

### 2. Knowledge Base Creation

```bash
curl -X POST "https://api.vapi.ai/knowledge-base" \
  -H "Authorization: Bearer YOUR_VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "lisa_integrity_coaching_kb",
    "provider": "google",
    "fileIds": ["YOUR_FILE_ID_FROM_STEP_1"]
  }'
```

### 3. Key Differences from Documentation

- **File upload:** Must include `;type=text/markdown` for proper MIME type
- **Knowledge base:** Cannot include `description` field (not supported)
- **Response format:** Different from what might be expected - includes orgId and more metadata

## API Reference

- **File Upload:** `POST https://api.vapi.ai/file`
- **Knowledge Base Creation:** `POST https://api.vapi.ai/knowledge-base`
- **Knowledge Base Management:** Available via Vapi dashboard

For detailed API documentation, visit: https://docs.vapi.ai/
