import { useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadStaffImageAndRegister } from "@/lib/elevateApi";
import { toast } from "sonner";

type Props = {
  onAssetId: (id: string | undefined) => void;
  context?: string;
  label?: string;
};

export default function CloudinaryImageField({ onAssetId, context, label = "Upload image" }: Props) {
  const [uploading, setUploading] = useState(false);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { mediaAssetId } = await uploadStaffImageAndRegister(file, { context });
      onAssetId(mediaAssetId);
      toast.success("Image registered");
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Upload failed";
      toast.error("Image upload failed", {
        description: `${detail} Ensure the Elevate API has Cloudinary env vars and your account is org_admin. See docs/DEPLOYMENT.md (CMS troubleshooting).`,
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={(ev) => void onChange(ev)}
        disabled={uploading}
        className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5"
      />
      {uploading ? <p className="text-xs text-muted-foreground">Uploading…</p> : null}
      <Button type="button" variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={() => onAssetId(undefined)}>
        Clear cover image id
      </Button>
    </div>
  );
}
