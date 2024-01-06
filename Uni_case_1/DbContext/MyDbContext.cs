namespace Uni_case_1.DbContext;
using Microsoft.EntityFrameworkCore;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Equipment> Equipment { get; set; }
    public DbSet<Milbase> Milbases { get; set; }
    public DbSet<Status> Statuses { get; set; }
    public DbSet<Access> Accesses { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlite("Data Source=uni_case1_database.db");
        }
    }
}
