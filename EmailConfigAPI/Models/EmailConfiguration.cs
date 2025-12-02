public enum ProviderType { Exchange = 0, IMAP = 1 }

public class EmailConfiguration
{
    public int Id { get; set; } // Primary key

    public string Name { get; set; } = string.Empty;

    public string WatchedFolder { get; set; } = string.Empty;

    public ProviderType Provider { get; set; }

    public bool StoreAttachments { get; set; }
}
